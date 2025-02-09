import React from 'react';

import { Profiler, Renderer, Scene } from '@bananagl/bananagl';

function formatByteSize(bytes: number) {
    if (bytes < 1024) {
        return `${bytes} bytes`;
    } else if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(2)} KB`;
    } else if (bytes < 1024 * 1024 * 1024) {
        return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
    } else {
        return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
    }
}

export interface VitalsProps {
    scenes: Scene[];
    renderer: Renderer;
}

export function Vitals(props: VitalsProps) {
    const [profiler] = React.useState(new Profiler());
    const [fps, setFps] = React.useState(0);
    const [mem, setMem] = React.useState(0);

    React.useEffect(() => {
        props.scenes.forEach((scene) => {
            profiler.addScene(scene);
        });

        profiler.setRenderer(props.renderer);

        const timer = setInterval(() => {
            const mem = profiler.logMemory();
            const fps = profiler.logFps();

            setFps(fps ?? 0);
            setMem(mem);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className="flex flex-row place-content-end space-x-4 p-2 flex-1 text-sm text-neutral-400">
            <div className="flex flex-row items-center place-content-end whitespace-nowrap">
                {fps.toFixed(0)} FPS &#x2022; {formatByteSize(mem)}
            </div>
        </div>
    );
}
