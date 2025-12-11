import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { PatientsModule } from './modules/patients/patients.module';
import { DoctorsModule } from './modules/doctors/doctors.module';
import { CountriesModule } from './modules/countries/countries.module';
import { StatesModule } from './modules/states/states.module';
import { AddressesModule } from './modules/addresses/addresses.module';
import { IdentityTypesModule } from './modules/identity-types/identity-types.module';
import { SpecialtiesModule } from './modules/specialties/specialties.module';
import { VisibilityLevelsModule } from './modules/visibility-levels/visibility-levels.module';
import { MedicalHistoryModule } from './modules/medical-history/medical-history.module';
import { MedicalEventTypesModule } from './modules/medical-event-types/medical-event-types.module';
import { AppointmentTypesModule } from './modules/appointment-types/appointment-types.module';
import { AppointmentStatusModule } from './modules/appointment-status/appointment-status.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { RegulatoryClassesModule } from './modules/regulatory-classes/regulatory-classes.module';
import { MedicationsModule } from './modules/medications/medications.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // GraphQL Code First
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        sortSchema: true,
        playground: true, // dev only
        
        // Clean GraphQL errors: remove stacktraces and keep concise messages
        formatError: (error) => {
          const formatted: any = { message: error.message };

          const code = error.extensions?.code;
          if (code) {
            formatted.extensions = { code };
          }

          // If the original exception had a response (Nest HttpException), use its message
          const exception: any = error.extensions?.exception;
          const response = exception?.response;
          if (response && typeof response === 'object') {
            const respMessage: any = response.message;
            if (Array.isArray(respMessage)) {
              formatted.message = respMessage.join('; ');
            } else if (typeof respMessage === 'string') {
              formatted.message = respMessage;
            }
            formatted.extensions = {
              ...(formatted.extensions || {}),
              status: response.statusCode ?? response.status,
              error: response.error,
            };
          }

          return formatted;
        },
      }),
    }),

    // TypeORM
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: +config.get('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true, // dev only
      }),
    }),

    UsersModule,
    RolesModule,
    PatientsModule,
    DoctorsModule,
    CountriesModule,
    StatesModule,
    AddressesModule,
    IdentityTypesModule,
    SpecialtiesModule,
    VisibilityLevelsModule,
    MedicalEventTypesModule,
    MedicalHistoryModule,
    // Appointment modules
    AppointmentTypesModule,
    AppointmentStatusModule,
    AppointmentsModule,
    RegulatoryClassesModule,
    MedicationsModule,
  ],
})
export class AppModule {}
