import React from "react";
import { storiesOf } from "@storybook/react";

import { MultipleCsvViewer } from "../src/components/Main";

const stories = storiesOf("App test", module);

stories.add("App", () => {
  return <MultipleCsvViewer />;
});
