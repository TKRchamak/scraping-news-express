import fs from "fs";

function updateJsonData(data: any[], key: string, value: any) {
  data.forEach((item) => {
    item[key] = value;
  });
  return data;
}

export const updateJson = (jsonPath: string, key: string, value: any) => {
  const jsonData = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

  const updatedData = updateJsonData(jsonData, key, value);

  // Convert the updated data back to a JSON string
  const updatedJsonString = JSON.stringify(updatedData, null, 2);

  // Write the updated JSON string back to the file
  fs.writeFileSync(jsonPath, updatedJsonString, "utf8");
};
