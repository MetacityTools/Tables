import React from 'react';

import { Node } from '@utils/hierarchy/graph';
import { createGroup } from '@utils/hierarchy/groupModels';
import { EditorModel } from '@utils/models/models/EditorModel';

import { EditorContext, HierarchyContext } from '@editor/Context';

import { Button } from '@elements/Button';

import { GroupNodePanel } from './GroupPanel';

export function HierarchyPanel() {
    const ctx = React.useContext(EditorContext);
    const hierarchyCtx = React.useContext(HierarchyContext);
    const { graph, nodeToMove, setNodeToMove } = hierarchyCtx;
    const { models, selectedSubmodels } = ctx;

    const mainModel = models.filter((model) => model instanceof EditorModel)[0];
    const submodels = React.useMemo(() => new Set(selectedSubmodels), [selectedSubmodels]);

    const group = () => {
        createGroup(selectedSubmodels, graph);
    };

    const unmove = () => {
        setNodeToMove(undefined);
    };

    return (
        <div className="flex flex-col w-full h-full">
            <div className="text-xs px-4 py-4 border-b space-x-2">
                <Button onClick={group}>Group Selected</Button>
                {nodeToMove && <Button onClick={unmove}>Unmove</Button>}
            </div>
            <div className="flex flex-col flex-grow overflow-y-auto p-4">
                <GroupNodePanel model={mainModel} submodels={submodels} node={graph.root} />
            </div>
        </div>
    );
}
