import React from 'react';

import { DirectionControls } from './Direction';
import { ProjectionControls } from './Projection';
import { ShaderControls } from './Shader';

export function ViewControls() {
    return (
        <div className="absolute m-4 space-x-2 left-0 top-0 z-40 flex flex-row ">
            <ProjectionControls />
            <DirectionControls />
            <ShaderControls />
        </div>
    );
}
