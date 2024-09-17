type Mode = {
  modeId: string;
  name: string;
};

type VariableInfo = {
  name: string;
  resolvedType: VariableResolvedDataType;
  valuesByMode: { [modeId: string]: any };
};

type CollectionInfo = {
  id: string;
  name: string;
  modes: Mode[];
  variables: VariableInfo[];
};

figma.showUI(__html__, { width: 400, height: 300 });

figma.ui.onmessage = async (msg: { type: string; collectionId?: string; data?: CollectionInfo }) => {
  if (msg.type === 'get-collections') {
    const collections = await figma.variables.getLocalVariableCollectionsAsync();
    if (collections.length === 0) {
      figma.ui.postMessage({ type: 'no-collections' });
      return;
    }
    
    // Send collection info back to the UI for display
    const collectionsInfo = collections.map(collection => ({
      id: collection.id,
      name: collection.name,
    }));
    
    figma.ui.postMessage({ type: 'collections-list', data: collectionsInfo });
  } 

  else if (msg.type === 'copy-collection' && msg.collectionId) {
    const collections = await figma.variables.getLocalVariableCollectionsAsync();
    const selectedCollection = collections.find(c => c.id === msg.collectionId);

    if (!selectedCollection) {
      figma.ui.postMessage({ type: 'no-collections' });
      return;
    }

    console.log('Selected Collection:', selectedCollection);

    const variables = await Promise.all(selectedCollection.variableIds.map(id => figma.variables.getVariableByIdAsync(id)));

    console.log('Fetched Variables:', variables);

    const collectionData: CollectionInfo = {
      id: selectedCollection.id,
      name: selectedCollection.name,
      modes: selectedCollection.modes,
      variables: variables.filter((v): v is Variable => v !== null).map(v => ({
        name: v.name,
        resolvedType: v.resolvedType,
        valuesByMode: Object.fromEntries(
          Object.entries(v.valuesByMode).map(([modeId, value]) => [modeId, value])
        )
      }))
    };

    console.log('Collection Data to be Copied:', collectionData);

    figma.ui.postMessage({ type: 'collection-copied', data: collectionData });
  } 

  else if (msg.type === 'paste-collection' && msg.data) {
    const collectionData = msg.data;

    console.log('Collection Data to be Pasted:', collectionData);
    const newCollection = figma.variables.createVariableCollection(collectionData.name);
    console.log('New Collection Created:', newCollection);
    
    const modeIdMap: { [oldModeId: string]: string } = {};
    modeIdMap[collectionData.modes[0].modeId] = newCollection.modes[0].modeId; // Map default mode
    
    collectionData.modes.slice(1).forEach((mode) => { 
        const newMode = newCollection.addMode(mode.name);
        modeIdMap[mode.modeId] = newMode;
        console.log('New Mode Added:', newMode);
    });
    
    for (const v of collectionData.variables) {
        const newVariable = figma.variables.createVariable(v.name, newCollection, v.resolvedType); // Pass the collection node
        console.log('New Variable Created:', newVariable);
    
        for (const [oldModeId, value] of Object.entries(v.valuesByMode)) {
            const newModeId = modeIdMap[oldModeId];
            if (newModeId) {
                newVariable.setValueForMode(newModeId, value);
                console.log(`Set Value for Mode: ${newModeId}, Value: ${value}`);
            } else {
                console.error(`Mode ID ${oldModeId} not found in modeIdMap`);
            }
        }
    }
    
    figma.ui.postMessage({ type: 'collection-pasted' });
    console.log('Collection Pasted Successfully');
  }
};