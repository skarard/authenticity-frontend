export const parseEnvVar = (value: string, name: string) => {
  if (!value) throw Error(`Environment variable ${name} is not set.`);
  return value;
};
