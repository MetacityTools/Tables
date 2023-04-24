import { Allotment } from 'allotment';
import React from 'react';

import { EditorModel } from '@utils/models/EditorModel';
import { addUserModels } from '@utils/models/addUserModel';
import { transform } from '@utils/transforms/transform';

import * as GL from '@bananagl/bananagl';

import { EmptyDataPanel, EmptyDetialPanel } from '@elements/Empty';

import { ActionMenu } from './Controls/Actions';
import { ModelDetailPanel } from './Controls/ModelDetail';
import { ModelList } from './Controls/ModelList';

export interface ControlsProps {
    scene: GL.Scene;
    renderer: GL.Renderer;
    selection: GL.SelectionManager;
}

async function loadFiles(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files) {
        return [];
    }
    const fileData = [];
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const buffer = await file.arrayBuffer();
        fileData.push({ name: file.name, buffer });
    }
    return fileData;
}

export function ControlPanel(props: ControlsProps) {
    const { scene, renderer, selection } = props;

    const [models, setModels] = React.useState<EditorModel[]>([]);
    const [selectedModel, setSelectedModel] = React.useState<EditorModel | null>(null);

    React.useEffect(() => {
        scene.onChange = () => {
            const copy = scene.objects.filter((obj) => obj instanceof EditorModel) as EditorModel[];
            setModels(copy);
        };
    }, [scene]);

    const handleModelsSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const models = await loadFiles(event);
        addUserModels(scene, selection, models);
    };

    const handleTransformCompute = () => {
        transform(scene);
    };

    return (
        <div className="text-xs bg-neutral-100 w-full h-full flex flex-col items-start">
            <ActionMenu
                onModelsSelected={handleModelsSelected}
                onTransformComputed={handleTransformCompute}
                scene={scene}
                renderer={renderer}
            />
            <Allotment separator={false} vertical>
                <Allotment.Pane minSize={200} preferredSize={300}>
                    <div className="overflow-x-auto w-full h-full">
                        {models.length === 0 && <EmptyDataPanel />}
                        {models.length > 0 && (
                            <ModelList
                                models={models}
                                selectedModel={selectedModel}
                                selectModel={setSelectedModel}
                            />
                        )}
                    </div>
                </Allotment.Pane>
                <Allotment.Pane minSize={200} className="border-t border-white">
                    {!selectedModel && <EmptyDetialPanel />}
                    {selectedModel && (
                        <ModelDetailPanel scene={scene} renderer={renderer} model={selectedModel} />
                    )}
                </Allotment.Pane>
            </Allotment>
        </div>
    );
}
