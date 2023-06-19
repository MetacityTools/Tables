import React from 'react';
import { BiCategoryAlt } from 'react-icons/bi';

import { MetadataNode } from '@utils/types';

import { useMetadata } from './ViewerContext';

type NodePath = {
    node: MetadataNode;
    key: string;
}[];

const rootNodeLabel = 'Attributes';

export function MetadataHierarchy() {
    const [metadata] = useMetadata();
    const [path, setPath] = React.useState<NodePath>([getRoot(metadata)]);

    React.useEffect(() => {
        setPath([getRoot(metadata)]);
    }, [metadata]);

    const handleSelect = (node: MetadataNode) => {
        const newPath = findPath(metadata, rootNodeLabel, node);
        if (newPath) setPath(newPath);
    };

    const last = path[path.length - 1];
    console.log(path);
    return (
        <div className="h-[calc(100%-50px)] mt-[50px] absolute top-0 left-0">
            <div className="flex flex-row bg-neutral-50 ml-4 rounded-t-md border-t border-x">
                {path.map((node, i) => {
                    return (
                        <button
                            className="px-4 py-2 flex flex-row items-center overflow-hidden overflow-ellipsis hover:text-amber-900 cursor-pointer first:rounded-t-md last:rounded-b-md first-letter:capitalize text-xs"
                            onClick={() => setPath(path.slice(0, i + 1))}
                            key={node.key}
                        >
                            <BiCategoryAlt className="mr-2" /> {node.key}
                        </button>
                    );
                })}
            </div>
            <MetadataMenu node={last.node} onSelect={handleSelect} />
        </div>
    );
}

function getRoot(node: MetadataNode) {
    return {
        node,
        key: rootNodeLabel,
    };
}

function MetadataMenu(props: { node: MetadataNode; onSelect?: (node: MetadataNode) => void }) {
    return (
        <div className="flex flex-col ml-4 bg-neutral-50 rounded-b-md border max-w-[35rem] overflow-auto">
            {props.node.children &&
                Object.entries(props.node.children).map(([key, value]) => {
                    return (
                        <button
                            className="px-4 py-2 flex flex-row items-center overflow-hidden overflow-ellipsis hover:bg-amber-200 hover:text-amber-900 cursor-pointer last:rounded-b-md first-letter:capitalize text-left"
                            onClick={() => props.onSelect?.(value)}
                            key={key}
                        >
                            <div>
                                <BiCategoryAlt className="mr-2" />
                            </div>
                            <div>{key}</div>
                        </button>
                    );
                })}
            {/* TODO values */}
        </div>
    );
}

function findPath(node: MetadataNode, nodeKey: string, target: MetadataNode): NodePath | null {
    if (node === target)
        return [
            {
                node,
                key: nodeKey,
            },
        ];
    if (!node.children) return null;

    for (const [key, value] of Object.entries(node.children)) {
        const path = findPath(value, key, target);
        console.log(path);
        if (path) return [{ node, key: nodeKey }, ...path];
    }

    return null;
}
