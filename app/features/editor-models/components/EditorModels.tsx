import {
  ActionBar,
  ActionBarContainer,
  ActionGroup,
  ActionMenu,
  Flex,
  Item,
  ListView,
  Text,
  View,
} from "@adobe/react-spectrum";
import { NoData } from "@core/components/Empty";

import { PositioningContainer } from "@core/components/PositioningContainer";
import SidebarHeader from "@core/components/SidebarHeader";
import { MdiArrowSplitVertical } from "@core/icons/MdiArrowSplitVertical";
import { MdiEye } from "@core/icons/MdiEye";
import { MdiEyeOff } from "@core/icons/MdiEyeOff";
import { MdiRename } from "@core/icons/MdiRename";
import { MdiRulerSquare } from "@core/icons/MdiRulerSquare";
import { MdiTrash } from "@core/icons/MdiTrash";
import useModelSelection from "@features/editor-models/hooks/useModelSelection";
import { EditorModel } from "@features/editor/data/EditorModel";
import useModelList from "@features/editor/hooks/useModelList";
import useModelToggleVisibility from "@features/editor/hooks/useModelToggleVisibility";
import { useRemoveModels } from "@features/editor/hooks/useRemoveModels";
import { useRemoveSubmodels } from "@features/editor/hooks/useRemoveSubmodels";
import { useSelected } from "@features/editor/hooks/useSelected";
import useSelectedSubmodelCount from "@features/editor/hooks/useSelectedSubmodelCount";
import { useSplitModel } from "@features/editor/hooks/useSplitModel";
import Delete from "@spectrum-icons/workflow/Delete";
import { Key, useCallback, useState } from "react";
import EditorProjectModelDialog from "./EditorProjectModelDialog";
import EditorRenameModelDialog from "./EditorRenameModelDialog";

export default function EditorModels() {
  return (
    <PositioningContainer>
      <View position="relative" height="100%" overflow="auto" backgroundColor="gray-50">
        <EditorModelList />
      </View>
    </PositioningContainer>
  );
}

function EditorModelList() {
  const removeModels = useRemoveModels();
  const setVisibility = useModelToggleVisibility();
  const removeSubmodels = useRemoveSubmodels();
  const splitModel = useSplitModel();
  const selected = useSelected();
  const selectedCount = useSelectedSubmodelCount();

  const [editingModel, setEditingModel] = useState<EditorModel | null>(null);
  const [projectionSourceModel, setProjectionSourceModel] = useState<EditorModel | null>(null);

  const dispatchAction = useCallback(
    async (model: EditorModel, action: Key) => {
      switch (action) {
        case "delete":
          removeModels([model]);
          break;
        case "hide":
          setVisibility(model, false);
          break;
        case "show":
          setVisibility(model, true);
          break;
        case "deleteSubmodels":
          await removeSubmodels(model, selected.get(model) || new Set());
          break;
        case "split":
          await splitModel(model, selected.get(model) || new Set());
          break;
        case "rename":
          setEditingModel(model);
          break;
        case "project":
          setProjectionSourceModel(model);
          break;
      }
    },
    [setVisibility, removeModels, removeSubmodels, splitModel, selected]
  );

  const dispatchGlobalAction = useCallback(
    (key: Key) => {
      switch (key) {
        case "delete":
          removeModels(Array.from(selected.keys()));
          break;
      }
    },
    [removeModels, selected]
  );

  const [modelList, selectedModelKeys] = useModelList();
  const { handleSelection, select } = useModelSelection(selectedModelKeys);

  return (
    <PositioningContainer>
      <Flex direction="column" height="100%" gap="size-100">
        <EditorRenameModelDialog close={() => setEditingModel(null)} model={editingModel} open={!!editingModel} />
        <EditorProjectModelDialog
          model={projectionSourceModel}
          open={!!projectionSourceModel}
          close={() => setProjectionSourceModel(null)}
        />
        <SidebarHeader title="Models" />
        <View position="relative" height="100%" overflow="hidden">
          <ActionBarContainer height="100%" width="100%">
            <ListView
              isQuiet
              density="spacious"
              selectionMode="multiple"
              aria-label="Model list"
              width="100%"
              marginBottom="size-100"
              height="100%"
              onSelectionChange={handleSelection}
              items={modelList}
              selectedKeys={selectedModelKeys}
              renderEmptyState={() => <NoData heading="No models in the project" />}
            >
              {(model) => (
                <Item key={model.key} textValue={model.item.name}>
                  <Text
                    UNSAFE_style={{
                      fontFamily: "monospace",
                      opacity: model.selectedSubmodels > 0 ? 1 : 0.6,
                    }}
                  >
                    [{String(model.selectedSubmodels).padStart(4, "0")} of{" "}
                    {String(model.totalSubmodels).padStart(4, "0")}] {model.item.name}
                  </Text>
                  {/* <Text
                    slot="description"
                    UNSAFE_style={{
                      opacity: model.selectedSubmodels > 0 ? 1 : 0.6,
                    }}
                  >
                    {model.selectedSubmodels} of {model.totalSubmodels} submodels selected
                  </Text> */}
                  <ActionGroup onAction={(key) => dispatchAction(model.item, key)}>
                    <Item key="delete" textValue="Delete">
                      <MdiTrash />
                    </Item>
                    {model.item.visible ? (
                      <Item key="hide" textValue="Hide">
                        <MdiEye />
                      </Item>
                    ) : (
                      <Item key="show" textValue="Show">
                        <MdiEyeOff />
                      </Item>
                    )}
                  </ActionGroup>
                  <ActionMenu onAction={(key) => dispatchAction(model.item, key)}>
                    <Item key="rename" textValue="Rename model">
                      <MdiRename />
                      <Text>Rename model</Text>
                    </Item>
                    <Item key="deleteSubmodels" textValue="Delete submodels">
                      <MdiTrash />
                      <Text>Delete selected submodels</Text>
                    </Item>
                    <Item key="split" textValue="Split model">
                      <MdiArrowSplitVertical />
                      <Text>Split model</Text>
                    </Item>
                    <Item key="project" textValue="Project onto other model">
                      <MdiRulerSquare />
                      <Text>Project onto other model</Text>
                    </Item>
                  </ActionMenu>
                </Item>
              )}
            </ListView>
            <ActionBar
              isEmphasized
              selectedItemCount={selectedCount}
              onAction={dispatchGlobalAction}
              onClearSelection={() => select(new Map())}
            >
              <Item key="delete">
                <Delete />
                <Text>Remove models</Text>
              </Item>
            </ActionBar>
          </ActionBarContainer>
        </View>
      </Flex>
    </PositioningContainer>
  );
}
