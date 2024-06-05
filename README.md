# Development: Getting Started

To start development, it is suggested that you use a virtual environment to manage the packages needed for the software development. You will need to install __Node.js__, which comes with __npm__, but I would recommend using a version manager like __pnpm__.

## Creating a Virtual Environment

To create a virtual environment using __micromamba__ and ensure faster installs, you need to have both __nodejs__ and __pnpm__. You can set this up with the following command:

```bash
micromamba create --prefix ./menv nodejs pnpm
micromamba activate --prefix ./menv
pnpm install
```

Now your development environment should be good to go!

