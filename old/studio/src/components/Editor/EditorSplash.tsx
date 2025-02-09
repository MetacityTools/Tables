import { Dialog } from '@headlessui/react';
import React from 'react';
import {
    TbSquareRoundedNumber1Filled,
    TbSquareRoundedNumber2Filled,
    TbSquareRoundedNumber3Filled,
} from 'react-icons/tb';

import { DialogOption, OverlayDialog } from '@elements/Dialog';

import splash from '@assets/ikea4.png';

export function EditorSpash() {
    const [isOpen, setIsOpen] = React.useState(true);

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <OverlayDialog isOpen={isOpen} onClose={closeModal}>
            <div
                className="w-full h-64 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${splash})`,
                }}
            ></div>
            <Dialog.Title
                as="h1"
                className="text-2xl font-medium leading-6 text-900 dark mx-6 mt-6"
            >
                Metacity Studio Editor
            </Dialog.Title>
            <div className="mx-6 mb-4">
                <p className="text-500">v{APP_VERSION}</p>
                <p>
                    <a href="/privacy" className="underline text-500 text-xs outline-none">
                        Privacy Policy
                    </a>
                </p>
            </div>
            <div className="mx-6 mb-8">
                <div className="flex flex-row items-center mc-text">
                    <TbSquareRoundedNumber1Filled className="mr-2 text-xl text-neutral-500" />
                    import, transform, and align models
                </div>
                <div className="border-l ml-2 pl-5 border-500 border-neutral-500 border-dashed">
                    <ul className="list-disc list-inside text-sm py-2 mc-text">
                        <li>SHP (only Polygons and MultiPatch)</li>
                        <li>IFC</li>
                        <li>GLTF/GLB (only triangular mesh)</li>
                        <li>Metacity File Format</li>
                    </ul>
                </div>
                <div className="flex flex-row items-center mc-text">
                    <TbSquareRoundedNumber2Filled className="mr-2 text-xl text-neutral-500" />
                    connect metadata
                </div>
                <div className="border-l h-4 ml-2 border-neutral-500 border-dashed"></div>
                <div className="flex flex-row items-center mc-text">
                    <TbSquareRoundedNumber3Filled className="mr-2 text-xl text-neutral-500" />
                    export
                </div>
            </div>
            <div className="mx-6 mt-6">
                <DialogOption
                    title="Stay and use Editor"
                    body="Editor allows you to create a new Studio project"
                    onClick={closeModal}
                    secondary
                />
            </div>
            <div className="mx-6 mt-2 mb-8">
                <DialogOption
                    title="Go to Viewer"
                    body="Viewer allows you to view an existing Studio project"
                    href="/"
                />
            </div>
        </OverlayDialog>
    );
}
