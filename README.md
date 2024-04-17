# Chart Studio

Chart Studio is a web app that enables users to create customizable charts of
Merapi monitoring data using [BMA](https://bma.cendana15.com/) Web Services.

## Environment Variable Settings

There are several required environment variables that need to be set in
`.env.[mode].local` file:

- VUE_APP_BMA_URL

  BMA web services URL, e.g. `https://bma.cendana15.com` to fetch various
  monitoring data.

- VUE_APP_BMA_API_KEY

  BMA API key credentials to grant access to the APIs. You can contact BMA
  administrator to get the key.

- VUE_APP_CENDANA_URL

  Cendana15 web services URL, e.g. `https://cendana15.com`. This is used to get
  user account info and grant permissions to access the resources provided by
  Cendana15 web services.

- VUE_APP_PLOTREQUEST_URL

  Plotrequest service URL, e.g `https://plotrequest.cendana15.com` to request
  predetermined charts of monitoring data.

- VUE_APP_PLOTREQUEST_API_KEY

  Plotrequest service API key credentials.

## Project Setup

Clone the project from GitHub repository:

    git clone https://github.com/bpptkg/chart-studio.git

Install all package dependencies:

    yarn install

Compiles and hot-reloads for development:

    yarn serve

Compiles and minifies for production:

    yarn build

Lints and fixes files if you made a change to the script:

    yarn lint

## Deployment

Create `.env.production.local` file and setup environment variable settings.
Finally, run `yarn build` to compile and minify for production.

On production environment, we deploy the app using `/chart-studio/` public path.
You can change this setting by adding `VUE_APP_PUBLIC_PATH` in your
`.env.production.local` file. You have to also adjust default Nginx
configuration if you set it to the different public path:

    location /chart-studio {
        alias /path/to/chart-studio/dist/;
        try_files $uri $uri/ /index.html = 404;
    }

In order to build the project, Chart Studio needs to read Git commit to mark
build revision. It may not work if you compile the source code without including
Git history, i.e. downloading the source code instead of cloning.

## License

[MIT](https://github.com/bpptkg/chart-studio/blob/master/LICENSE)
