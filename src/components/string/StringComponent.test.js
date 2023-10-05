import renderer from "react-test-renderer";
import { StringComponent } from "./index.tsx";

it("renders correctly", () => {
  const tree = renderer.create(<StringComponent> </StringComponent>).toJSON();
  expect(tree).toMatchSnapshot();
});
