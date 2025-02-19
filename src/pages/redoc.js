import { RedocStandalone } from "redoc";

export default function RedocPage () {
  return (
    <RedocStandalone
      specUrl="/api/swagger"
      options={{
        theme: { typography: { fontSize: "16px" } },
      }}
    />
  );
}
