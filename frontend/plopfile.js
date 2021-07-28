const requireField = fieldName => value => {
  if (String(value).length === 0) {
    return fieldName + ' is required';
  }
  return true;
};

module.exports = function (plop) {

  //  ██████  ██████  ███    ███ ██████   ██████  ███    ██ ███████ ███    ██ ████████
  // ██      ██    ██ ████  ████ ██   ██ ██    ██ ████   ██ ██      ████   ██    ██
  // ██      ██    ██ ██ ████ ██ ██████  ██    ██ ██ ██  ██ █████   ██ ██  ██    ██
  // ██      ██    ██ ██  ██  ██ ██      ██    ██ ██  ██ ██ ██      ██  ██ ██    ██
  //  ██████  ██████  ██      ██ ██       ██████  ██   ████ ███████ ██   ████    ██
  plop.setGenerator('component', {
    description: 'TS functional react component with props interface',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'Enter the component\'s name',
      validate: requireField('name')
    }],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/index.tsx',
        templateFile: 'plop-templates/component-functional-ts/index.hbs'
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/styles.module.scss',
        templateFile: 'plop-templates/component-functional-ts/styles.module.hbs'
      },
    ]
  });

  // ███████  ██████ ██████  ███████ ███████ ███    ██
  // ██      ██      ██   ██ ██      ██      ████   ██
  // ███████ ██      ██████  █████   █████   ██ ██  ██
  //      ██ ██      ██   ██ ██      ██      ██  ██ ██
  // ███████  ██████ ██   ██ ███████ ███████ ██   ████
  plop.setGenerator('screen', {
    description: 'TS functional react & redux & saga screen section with props interface and redux connection',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the screen (page)',
        validate: requireField('name')
      },
      {
        type: 'confirm',
        name: 'nested',
        message: 'Should it be placed inside of another screen?',
        default: false
      },
      {
        type: 'input',
        name: 'rootCatalog',
        message: 'Enter the name of the root catalog',
        validate: requireField('rootCatalog'),
        when: answers => answers.nested
      },
      {
        type: 'confirm',
        name: 'isRoutingScreen',
        message: 'Is this the routing screen?',
        default: false,
        when: answers => answers.nested
      },
      {
        type: 'input',
        name: 'routingScreenName',
        message: 'Enter the name of the routing screen of the page',
        validate: requireField('routingScreenName'),
        when: answers => answers.nested && !answers.isRoutingScreen
      }
    ],
    actions: data => {
      const ROOT_HANDLEBARS = 'plop-templates/screen-functional-ts';
      const rootPath = !data.nested ? 'src/screens/{{pascalCase name}}' : 'src/screens/{{pascalCase rootCatalog}}/{{pascalCase name}}';
      const handleBarsCatalog = !data.nested ? ROOT_HANDLEBARS + '/not_nested' :
        data.isRoutingScreen ? ROOT_HANDLEBARS + '/nested/routing'
          : ROOT_HANDLEBARS + '/nested/non_routing';
      const containerPostfix = data.isRoutingScreen ? 'Routing' : 'Page';
      const folderName = data.isRoutingScreen ? 'rootCatalog' : 'name';

      const actions = [
        {
          type: 'add',
          path: `${rootPath}/containers/{{pascalCase ${folderName}}}${containerPostfix}/index.tsx`,
          templateFile: `${handleBarsCatalog}/page/index.hbs`
        },
        {
          type: 'add',
          path: `${rootPath}/containers/{{pascalCase ${folderName}}}${containerPostfix}/styles.module.scss`,
          templateFile: `${handleBarsCatalog}/page/styles.module.hbs`
        },
        {
          type: 'add',
          path: `${rootPath}/reducers/index.ts`,
          templateFile: `${handleBarsCatalog}/reducer.hbs`
        },
        {
          type: 'add',
          path: `${rootPath}/sagas/index.ts`,
          templateFile: `${handleBarsCatalog}/sagas.hbs`
        }
      ];

      if (!data.isRoutingScreen) {
        actions.push(
          {
            type: 'add',
            path: `${rootPath}/containers/{{pascalCase ${folderName}}}${containerPostfix}/reducer.ts`,
            templateFile: `${handleBarsCatalog}/page/reducer.hbs`
          },
          {
            type: 'add',
            path: `${rootPath}/containers/{{pascalCase ${folderName}}}${containerPostfix}/sagas.ts`,
            templateFile: `${handleBarsCatalog}/page/sagas.hbs`
          },
          {
            type: 'add',
            path: `${rootPath}/routines/index.ts`,
            templateFile: `${handleBarsCatalog}/routines.hbs`
          }
        )
      }

      if (!data.nested) {
        actions.push(
          {
            type: 'append',
            path: 'src/sagas.ts',
            pattern: '/* PlopJS import placeholder. Do not remove */',
            template: 'import {{camelCase name}}Sagas from \'@screens/{{pascalCase name}}/sagas\';'
          },
          {
            type: 'append',
            path: 'src/sagas.ts',
            pattern: '/* PlopJS sagas placeholder. Do not remove */',
            template: '    {{camelCase name}}Sagas(),'
          },
          {
            type: 'append',
            path: 'src/reducers.ts',
            pattern: '/* PlopJS import placeholder. Do not remove */',
            template: 'import {{camelCase name}}Reducer from \'@screens/{{pascalCase name}}/reducers\';'
          },
          {
            type: 'append',
            path: 'src/reducers.ts',
            pattern: '/* PlopJS reducer placeholder. Do not remove */',
            template: '  {{camelCase name}}Reducer,'
          }
        );
      } else {
        if (data.isRoutingScreen) {
          actions.push(
            {
              type: 'append',
              path: 'src/sagas.ts',
              pattern: '/* PlopJS import placeholder. Do not remove */',
              template: 'import {{camelCase rootCatalog}}Sagas from \'@screens/{{pascalCase rootCatalog}}/{{pascalCase name}}/sagas\';'
            },
            {
              type: 'append',
              path: 'src/sagas.ts',
              pattern: '/* PlopJS sagas placeholder. Do not remove */',
              template: '    {{camelCase rootCatalog}}Sagas(),'
            },
            {
              type: 'append',
              path: 'src/reducers.ts',
              pattern: '/* PlopJS import placeholder. Do not remove */',
              template: 'import {{camelCase rootCatalog}}Reducer from \'@screens/{{pascalCase rootCatalog}}/{{pascalCase name}}/reducers\';'
            },
            {
              type: 'append',
              path: 'src/reducers.ts',
              pattern: '/* PlopJS reducer placeholder. Do not remove */',
              template: '  {{camelCase rootCatalog}}Reducer,'
            }
          );
        } else {
          const routingScreenPath = 'src/screens/{{pascalCase rootCatalog}}/{{pascalCase routingScreenName}}';
          // is not a routing screen
          actions.push(
            {
              type: 'append',
              path: routingScreenPath + '/sagas/index.ts',
              pattern: '/* PlopJS import placeholder. Do not remove */',
              template: 'import {{camelCase name}}Sagas from \'@screens/{{pascalCase rootCatalog}}/{{pascalCase name}}/sagas\';'
            },
            {
              type: 'append',
              path: routingScreenPath + '/sagas/index.ts',
              pattern: '/* PlopJS sagas placeholder. Do not remove */',
              template: '    {{camelCase name}}Sagas(),'
            },
            {
              type: 'append',
              path: routingScreenPath + '/reducers/index.ts',
              pattern: '/* PlopJS import placeholder. Do not remove */',
              template: 'import {{camelCase name}} from \'@screens/{{pascalCase rootCatalog}}/{{pascalCase name}}/reducers\';'
            },
            {
              type: 'append',
              path: routingScreenPath + '/reducers/index.ts',
              pattern: '/* PlopJS reducer placeholder. Do not remove */',
              template: '  {{camelCase name}},'
            }
          );
        }
      }
      return actions;
    }
  });

  // ██████   ██████  ██    ██ ████████ ██ ███    ██ ███████
  // ██   ██ ██    ██ ██    ██    ██    ██ ████   ██ ██
  // ██████  ██    ██ ██    ██    ██    ██ ██ ██  ██ █████
  // ██   ██ ██    ██ ██    ██    ██    ██ ██  ██ ██ ██
  // ██   ██  ██████   ██████     ██    ██ ██   ████ ███████
  plop.setGenerator('routine', {
    description: 'A routine to go',
    prompts: [
      {
        type: 'input',
        name: 'routineName',
        message: 'Enter the name of the routine',
        validate: requireField('routineName')
      },
      {
        type: 'input',
        name: 'screenName',
        message: 'Enter the name of the screen (page)',
        validate: requireField('screenName')
      },
      {
        type: 'confirm',
        name: 'isNested',
        message: 'Is the target component nested (inside of another screen)?',
        default: false
      },
      {
        type: 'input',
        name: 'rootCatalog',
        message: 'Enter the name of the root catalog',
        validate: requireField('rootCatalog'),
        when: answers => answers.isNested
      }
    ],
    actions: data => {
      const rootPath = !data.isNested ? 'src/screens/{{pascalCase screenName}}/'
        : 'src/screens/{{pascalCase rootCatalog}}/{{pascalCase screenName}}/';
      const importPath = !data.isNested ? '@screens/{{pascalCase screenName}}'
        : '@screens/{{pascalCase rootCatalog}}/{{pascalCase screenName}}'
      return [
        {
          type: 'append',
          path: rootPath + 'routines/index.ts',
          pattern: '/* PlopJS routine placeholder. Do not remove */',
          template: 'export const {{camelCase routineName}}Routine = create{{pascalCase screenName}}Routine(\'{{constantCase routineName}}\');'
        },
        {
          type: 'append',
          path: rootPath + 'reducers/index.ts',
          pattern: '/* PlopJS request placeholder. Do not remove */',
          template: '  {{camelCase routineName}}Request: reducerCreator([{{camelCase routineName}}Routine.TRIGGER]),'
        },
        {
          type: 'append',
          path: rootPath + 'reducers/index.ts',
          pattern: '/* PlopJS request_extractor placeholder. Do not remove */',
          template: 'export const extract{{pascalCase routineName}}Loading = state => reqs(state).{{camelCase routineName}}Request.loading;\n'
            + 'export const extract{{pascalCase routineName}}Error = state => reqs(state).{{camelCase routineName}}Request.error;'
        },
        {
          type: 'append',
          path: rootPath + 'reducers/index.ts',
          pattern: '/* PlopJS import placeholder. Do not remove */',
          template: `import { {{camelCase routineName}}Routine } from \'${importPath}/routines\';`
        }
      ];
    }
  });
};
