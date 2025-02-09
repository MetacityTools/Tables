import { EditorModel, EditorModelData } from "@editor/data/EditorModel";
import { exportModel } from "@editor/utils/formats/metacity/write";
import { vec3 } from "gl-matrix";
import { useCallback } from "react";
import { ModelMetadataRecords } from "../data/types";
import { ProjectData } from "../utils/formats/metacity/types";
import { useEditorContext } from "./useEditorContext";

export function useExportModels() {
  const { models } = useEditorContext();
  const ctx = useEditorContext();

  const exportProject = useCallback(() => {
    const modelData = extractModels(models);
    if (!modelData) return;

    const view = ctx.renderer.views?.[ctx.activeView];
    if (!view) return;

    //export project settings
    const projectData: ProjectData = {
      style: ctx.styles,
      modelStyle: ctx.modelStyles,
      globalShift: ctx.globalShift ?? vec3.create(),
      activeMetadataColumn: ctx.activeMetadataColumn,
      cameraView: ctx.viewMode,
      cameraPosition: view.view.camera.position,
      cameraTarget: view.view.camera.target,
      projectionType: ctx.projection,
    };

    return exportModel(modelData, projectData);
  }, [ctx, models]);

  return exportProject;
}

export default function useExportEmbed() {
  const { models } = useEditorContext();
  const ctx = useEditorContext();

  const exportProject = useCallback(
    (selectedColumns: Set<string>) => {
      const modelData = extractModels(models);
      if (!modelData) return;

      const view = ctx.renderer.views?.[ctx.activeView];
      if (!view) return;

      //filter styles, keep only keys that are in selectedColumns
      const filteredStyles = Object.fromEntries(
        Object.entries(ctx.styles).filter(([key]) => selectedColumns.has(key)),
      );

      const filteredModels = modelData.map((model) => {
        const filteredMetadata: ModelMetadataRecords = {};
        for (const [submodelId, submodelMetadata] of Object.entries(
          model.metadata.data,
        )) {
          if (!submodelMetadata) continue;
          const filteredSubmodelMetadata = Object.fromEntries(
            Object.entries(submodelMetadata).filter(([key]) =>
              selectedColumns.has(key),
            ),
          );
          filteredMetadata[submodelId as unknown as number] =
            filteredSubmodelMetadata;
        }

        return {
          ...model,
          metadata: { ...model.metadata, data: filteredMetadata },
        };
      });

      //export project settings
      const projectData: ProjectData = {
        style: filteredStyles,
        modelStyle: ctx.modelStyles,
        globalShift: ctx.globalShift ?? vec3.create(),
        activeMetadataColumn: ctx.activeMetadataColumn,
        cameraView: ctx.viewMode,
        cameraPosition: view.view.camera.position,
        cameraTarget: view.view.camera.target,
        projectionType: ctx.projection,
      };

      return exportModel(filteredModels, projectData);
    },
    [ctx, models],
  );

  return exportProject;
}

function extractModels(models: EditorModel[]) {
  if (models.length === 0) throw new Error("No models to convert.");
  const processed: EditorModelData[] = [];

  for (const model of models) {
    //get required attributes
    const p = model.attributes.getAttribute("position");
    const s = model.attributes.getAttribute("submodel");
    if (!p || !s)
      throw new Error("Required attributes not found during conversion.");

    //get model nodes
    const modelMetadata = model.metadata;

    //apply positions
    const pi = new Float32Array(p.buffer.data.length);
    pi.set(p.buffer.data);
    const v = vec3.create();
    for (let i = 0; i < pi.length; i += 3) {
      vec3.set(v, pi[i], pi[i + 1], pi[i + 2]);
      vec3.transformMat4(v, v, model.transform);
      pi[i] = v[0];
      pi[i + 1] = v[1];
      pi[i + 2] = v[2];
    }

    //get view
    const sv = s.buffer.getView(Uint32Array) as Uint32Array;

    //create model data
    const modelData: EditorModelData = {
      uuid: model.uuid,
      geometry: {
        position: pi,
        submodel: sv,
      },
      metadata: {
        data: modelMetadata,
        visible: model.visible,
        name: model.name,
        primitive: model.primitive,
      },
    };

    //add to processed
    processed.push(modelData);
  }

  return processed;
}
