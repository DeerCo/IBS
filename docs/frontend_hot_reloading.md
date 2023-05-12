## Hot Reloading

If you have followed the instructions [here](getting_started.md) for setting up your development environment you will
notice that everytime you make a change to the frontend code, the code within the container doesn't get updated.

To make use of hot-reloading, use the commands within the `Makefile` at the root of this project.

Some common issues you may have can be fixed by taking note of the following:

- Ensure the `PORT` environment variable is set to `3000` i.e `PORT=3000`
- NGINX runs on port 80 so if you are sending http requests through Postman, you will have to change the environment
variables accordingly i.e. `base_url=http://localhost/api`

Then to build/run your containers you can do:

```bash
# Ensure you are at the root of the project otherwise the following commands will not be recognized
make build
make run
```