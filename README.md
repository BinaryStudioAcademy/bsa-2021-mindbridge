# Binary Studio Academy | 2021 | Java 

## [Mindbridge](http://mindbridge.westeurope.azurecontainer.io)
## [Staging Mindbridge](http://mindbridge-lb-252634146.eu-west-1.elb.amazonaws.com)

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

## Deployment
The project is deployed to Azure Container Instances. Github actions are used for CI and CD.

## Code quality
Static analyzers are used for both frontend and backend projects to ensure basic code quality. Additionally, [quality criteria](https://github.com/BinaryStudioAcademy/quality-criteria/blob/production/source/java/intro.md) (and [these one](https://github.com/BinaryStudioAcademy/quality-criteria/blob/production/source/javascript.md)) rules are enforced during code review and audit.

## License

Licensed under the [MIT](LICENSE.txt) license.
