import fs from 'fs';
import path from 'path';

type Type = 'controller' | 'interface' | 'model' | 'route' | 'service';

const generate =
  (type: Type) =>
  (name: string, rootDir: string, templatesDir: string, title = name[0].toUpperCase() + name.substring(1)) => {
    const content = fs
      .readFileSync(templatesDir + `/${type}.txt`, 'utf-8')
      .replace(/\$/g, title)
      .replace(/%/g, name);

    fs.writeFileSync(path.join(rootDir, `/src/${type}s/${name}.${type}.ts`), content);
    console.log(`=== GENERATED ${type} FILE ===`);
  };

const generateInterface = generate('interface');
const generateModel = generate('model');
const generateService = generate('service');
const generateController = generate('controller');
const generateRoute = generate('route');

const injectServiceIndex = (name: string, rootDir: string) => {
  const path = rootDir + '/src/services/index.ts';
  const content = `export { default as ${name}sService } from './${name}s.service';`;

  const index = fs.readFileSync(path, 'utf-8');
  const indexContent = `${content}\n${index}`;

  fs.writeFileSync(path, indexContent);
};

const injectControllerIndex = (name: string, rootDir: string) => {
  const path = rootDir + '/src/controllers/index.ts';
  const content = `export { default as ${name}sController } from './${name}s.controller';`;

  const index = fs.readFileSync(path, 'utf-8');
  const indexContent = `${content}\n${index}`;

  fs.writeFileSync(path, indexContent);
};

const injectRouteIndex = (name: string, rootDir: string) => {
  const path = rootDir + '/src/routes/index.ts';

  const importStatement = `import ${name}Router from './${name}.route';`;
  const useStatement = `router.use('/${name}', ${name}Router);`;

  const index = fs.readFileSync(path, 'utf-8');
  const indexContent = `${importStatement}\n${index}\n${useStatement}`;

  fs.writeFileSync(path, indexContent);
};

const run = (name: string) => {
  const root = path.join(__dirname, '../../');
  const templatesDir = path.join(__dirname, './templates');

  generateInterface(name, root, templatesDir);
  generateModel(name, root, templatesDir);
  generateService(name, root, templatesDir);
  injectServiceIndex(name, root);
  generateController(name, root, templatesDir);
  injectControllerIndex(name, root);
  generateRoute(name, root, templatesDir);
  injectRouteIndex(name, root);
};

run(process.argv[2]);
