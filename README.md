  # node.js/express/typescript tempalte

  ## Prerequisites
  node.js (>12.14.0) 
  mongodb (>4.2.2)

  ## Project setup
  ```sh
  $ npm install
  ```

  ### Debug
  ```sh
  $ npm run dev
  ```

  ### Test
  http://127.0.0.1:3000/api/test

  ### Build
  ```sh
  $ npm run build #"prod-server" folder will be generated. 
  ```

  ### Run
  1. Build front-end project - "xxx" to generate "vue-dist" folder.
  2. Copy "vue-dist" to "prod-server" folder.
  3. 
  ```sh
  $ npm run start
  ```

  ### Package
  pkg must installed
  ```sh
  npm install -g pkg
  ```
  Make sure "vue-dist" is generated and copied to "prod-server" folder
  ```sh
  $ npm run pkg #"windows and osx executables will be generated in "pkg-dist" folder
  ```
