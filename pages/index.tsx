import { Button, Center, Grid, Input, JsonInput } from "@mantine/core";
import { Textarea } from "@mantine/core";
import { Tabs } from "@mantine/core";
import axios from "axios";
import { Ref, useRef, useState } from "react";

export default function Home() {
  const story = useRef<any>();
  const tokenRef = useRef<any>();
  const [result, setResult] = useState("");

  function onCreate() {
    const query = story.current?.value;
    const token = tokenRef.current?.value;
    if (query.trim() && token.trim()) {
      axios
        .post("/api/complete", { prompt: query, token })
        .then(async (d) => {
          setResult(d?.data?.replace(/\n/g, ""));
        })
        .catch(console.error);
    }
  }

  return (
    <Grid>
      <Grid.Col span={6}>
        <Textarea
          placeholder="Write it here...."
          label="What you want to build ?"
          autosize
          minRows={20}
          ref={story}
        />
        <Input placeholder="Token..." ref={tokenRef} />
        <Button onClick={onCreate}>Get!</Button>
      </Grid.Col>
      <Grid.Col span={6}>
        <Center>
          <Tabs defaultValue="code" variant="pills">
            <Tabs.List>
              <Tabs.Tab value="visual" title="Visual">
                Visual
              </Tabs.Tab>
              <Tabs.Tab value="code" title="Code">
                Code
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="visual" pt="xl">
              1
            </Tabs.Panel>
            <Tabs.Panel value="code" pt="xl">
              <div dangerouslySetInnerHTML={{ __html: result }}></div>
            </Tabs.Panel>
          </Tabs>
        </Center>
      </Grid.Col>
    </Grid>
  );
}
