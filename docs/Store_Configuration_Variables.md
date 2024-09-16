# Store Configuration Variables

Applications often run in different environments. Depending on the environment, different configuration settings should be used. For example, usually the local environment relies on specific database credentials, valid only for the local DB instance. The production environment would use a separate set of DB credentials. Since configuration variables change, best practice is to store configuration variables in the environment.

## Installation

`$ npm i --save @nestjs/config`

The @nestjs/config package internally uses dotenv.

## Getting started

Once the installation process is complete, we can import the ConfigModule. Typically, we'll import it into the root AppModule and control its behavior using the .forRoot() static method. During this step, environment variable key/value pairs are parsed and resolved. Later, we'll see several options for accessing the ConfigService class of the ConfigModule in our other feature modules.

```bash
app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  })],
})
export class AppModule {}
```

```bash
.env

DATABASE_USER=test
DATABASE_PASSWORD=test
```

## Using the ConfigService

To access configuration values from our ConfigService, we first need to inject ConfigService. As with any provider, we need to import its containing module - the ConfigModule - into the module that will use it (unless you set the isGlobal property in the options object passed to the ConfigModule.forRoot() method to true). Import it into a feature module as shown below.

```bash
feature.module.ts

@Module({
  imports: [ConfigModule],
  // ...
})
```

As shown above, use the configService.get() method to get a simple environment variable by passing the variable name. You can do TypeScript type hinting by passing the type, as shown above (e.g., get<string>(...)). The get() method can also traverse a nested custom configuration object (created via a Custom configuration file), as shown in the second example above.

At the controller:

```bash
constructor(private configService: ConfigService) {}

const dbUser = this.configService.get<string>('DATABASE_USER');
```
