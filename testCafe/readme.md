# Setup

- Install Visual studio 2019
- Install nodejs: https://nodejs.org/en/

# Create project

- **Create project**: npm init -y
- **Install testcafe**: npm install --save-dev testcafe
- **Adjust scripts section in package.json file**: "testcafe chrome [folder tests]/"


# Testing structure

Name:
-  Lowercase
-  Replace spaces with hyphen


Structure: 

- **modules**
    - [name module]
        - [name module].[senairo].[fixture].js
        - 

## Example

- modules
    - employeee
        - employee.search.fixture.js
        - employee.create.fixture.js