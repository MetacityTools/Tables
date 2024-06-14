"use client";

import {
  ActionMenu,
  Button,
  Flex,
  Item,
  ListView,
  Text,
} from "@adobe/react-spectrum";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { ContentContainer } from "@core/components/ContentContainer";
import { NoData } from "@core/components/Empty";
import Header from "@features/projects/components/Header";
import { useOwnModels } from "@features/models/hooks/useOwnModels";
import File from "@spectrum-icons/illustrations/File";
import Link from "next/link";
import { useRouter } from "next/navigation";

function ModelListPage() {
  const { data: models, isLoading } = useOwnModels();
  const router = useRouter();

  return (
    <Flex
      direction="column"
      width="100%"
      height="100%"
      gap="size-10"
      justifyContent="start"
      alignItems="start"
    >
      <Header
        nav={[
          {
            key: "models",
            children: "Models",
          },
        ]}
      />
      <ContentContainer>
        <Button variant="secondary" href="/models/upload" elementType={Link}>
          Upload New Model
        </Button>
        <ListView
          width="size-6000"
          minHeight="size-3000"
          aria-label="ListView"
          renderEmptyState={() => <NoData />}
        >
          {models.map((model) => (
            <Item href={`/models/${model.id}`} key={model.id}>
              <File />
              <Text>{model.name}</Text>
              <ActionMenu
                onAction={(key) => {
                  if (key === "delete") {
                    const response = fetch(`/api/models/${model.id}`, {
                      method: "DELETE",
                    });
                    router.push("/models");
                  }
                }}
              >
                <Item key="delete" textValue="Delete">
                  <Text>Delete</Text>
                </Item>
              </ActionMenu>
            </Item>
          ))}
        </ListView>
      </ContentContainer>
    </Flex>
  );
}

export default withPageAuthRequired(ModelListPage);
