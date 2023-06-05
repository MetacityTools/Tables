import React from 'react';

import { Canvas } from '@utils/components/Canvas';
import { addGridModel } from '@utils/models/addGridModel';

import * as GL from '@bananagl/bananagl';

import { EditorContext } from '../Context/EditorContext';
import { Controls } from './Controls';
import { Help } from './Help';
import { Settings } from './Settings';

export function CanvasWrapper() {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const ctx = React.useContext(EditorContext);

    React.useEffect(() => {
        const { renderer, scene } = ctx;

        if (canvasRef.current && renderer) {
            GL.mountRenderer(canvasRef.current, renderer, {}, [
                {
                    view: new GL.View(scene),
                    size: {
                        mode: 'relative',
                        width: 100,
                        height: 100,
                    },
                    position: {
                        mode: 'relative',
                        top: 0,
                        left: 0,
                    },
                },
            ]);

            addGridModel(scene);
            renderer.clearColor = [1, 1, 1, 1];

            const down = (e: KeyboardEvent) => {
                renderer.window.controls.keydown(e);
            };

            const up = (e: KeyboardEvent) => {
                renderer.window.controls.keyup(e);
            };

            document.addEventListener('keydown', down);
            document.addEventListener('keyup', up);

            return () => {
                document.removeEventListener('keydown', down);
                document.removeEventListener('keyup', up);
                GL.unmountRenderer(renderer);
            };
        }
    }, [ctx.renderer, ctx.scene]);

    return (
        <>
            <Canvas canvasRef={canvasRef} />
            <Help />
            <Controls />
            <Settings />
        </>
    );
}
