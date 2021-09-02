# Binary Studio Academy | 2021 | Java 

### [Mindbridge](https://mindbridge.westeurope.cloudapp.azure.com) [![Deploy Mindbridge Prod](https://github.com/BinaryStudioAcademy/bsa-2021-mindbridge/actions/workflows/build_deploy_prod.yml/badge.svg?branch=dev)](https://github.com/BinaryStudioAcademy/bsa-2021-mindbridge/actions/workflows/build_deploy_prod.yml)
### [Staging Mindbridge](http://mindbridge-lb-252634146.eu-west-1.elb.amazonaws.com) [![Deploy Mindbridge Staging](https://github.com/BinaryStudioAcademy/bsa-2021-mindbridge/actions/workflows/build_deploy_staging.yml/badge.svg)](https://github.com/BinaryStudioAcademy/bsa-2021-mindbridge/actions/workflows/build_deploy_staging.yml)

> Let us connect your minds

Mindbridge is a portal for sharing knowledge and thoughts (although you all have got different on the same topic) to allow dev-community communicate through articles, comments and likes (seems like I heard it somewhere :smiley:)

# Technical side

## Tech stack

- Backend
    - Java 11 - core backend
    - Spring - core backend framework
    - Lombok - boiler-plate reducing annotation framework
    - Mapstruct - automapper to reduce mapping overhead
    - Hibernate - ORM for easy(but not simple) data access
    - Flyweight - migration tool
- Database
    - Postgresql
- Frontend
    - TypeScript (and JavaScript) - primary SPA implementation
    - React - SPA library
    - Redux - state management
    - Redux-toolkit - async interactions, effect management

## Documentation
There is a submodule called `docs` which is for updating the postman collection and docs related to the project.
To update it, please follow the next instructions:
```bash
# Time passes, submodule upstream is updated
# and you now want to update

# Change to the submodule directory 
# !from mindbridge root folder!
cd submodule_dir

# Checkout desired branch
git checkout master

# Update
git pull

# Get back to your project root
cd ..

# Now the submodules are in the state you want, so
git commit -am "Pulled down update to docs"
```

## Deployment
The project is deployed to Azure Container Instances. Github actions are used for CI and CD.

## Code quality
Static analyzers are used for both frontend and backend projects to ensure basic code quality. Additionally, [quality criteria](https://github.com/BinaryStudioAcademy/quality-criteria/blob/production/source/java/intro.md) (and [these one](https://github.com/BinaryStudioAcademy/quality-criteria/blob/production/source/javascript.md)) rules are enforced during code review and audit.

## License

Licensed under the [MIT](LICENSE.txt) license.
