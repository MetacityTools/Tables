import { Tab } from '@headlessui/react';
import { Allotment } from 'allotment';
import 'allotment/dist/style.css';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { TiArrowMove } from 'react-icons/ti';

import { TabButton, TabList, TabPanel } from '@elements/Tabs';

import { TransformMenu } from './Menu/TransformMenu';
import { Metadata } from './Metadata';
import { ModelList } from './ModelList/ModelList';
import { Modifiers } from './Modifiers/Modifiers';

export function TransformSidePanel() {
    return (
        <>
            <TransformMenu />
            <Allotment separator={false} vertical>
                <Allotment.Pane minSize={200} preferredSize={300}>
                    <ModelList />
                </Allotment.Pane>
                <Allotment.Pane minSize={200} className="flex flex-col border-t border-neutral-200">
                    <Tab.Group>
                        <TabList>
                            <TabButton>
                                <BiMessageSquareDetail className="text-xl w-full" />
                            </TabButton>
                            <TabButton>
                                <TiArrowMove className="text-xl w-full" />
                            </TabButton>
                        </TabList>
                        <Tab.Panels className="w-full h-full">
                            <TabPanel>
                                <Metadata />
                            </TabPanel>
                            <TabPanel>
                                <Modifiers />
                            </TabPanel>
                        </Tab.Panels>
                    </Tab.Group>
                </Allotment.Pane>
            </Allotment>
        </>
    );
}
