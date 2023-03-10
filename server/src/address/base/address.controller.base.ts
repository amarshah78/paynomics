/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import { AddressService } from "../address.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AddressCreateInput } from "./AddressCreateInput";
import { AddressWhereInput } from "./AddressWhereInput";
import { AddressWhereUniqueInput } from "./AddressWhereUniqueInput";
import { AddressFindManyArgs } from "./AddressFindManyArgs";
import { AddressUpdateInput } from "./AddressUpdateInput";
import { Address } from "./Address";
import { CustomerFindManyArgs } from "../../customer/base/CustomerFindManyArgs";
import { Customer } from "../../customer/base/Customer";
import { CustomerWhereUniqueInput } from "../../customer/base/CustomerWhereUniqueInput";
@swagger.ApiBasicAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class AddressControllerBase {
  constructor(
    protected readonly service: AddressService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @nestAccessControl.UseRoles({
    resource: "Address",
    action: "create",
    possession: "any",
  })
  @common.Post()
  @swagger.ApiCreatedResponse({ type: Address })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(@common.Body() data: AddressCreateInput): Promise<Address> {
    return await this.service.create({
      data: data,
      select: {
        address_1: true,
        address_2: true,
        city: true,
        createdAt: true,
        id: true,
        state: true,
        updatedAt: true,
        zip: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @nestAccessControl.UseRoles({
    resource: "Address",
    action: "read",
    possession: "any",
  })
  @common.Get()
  @swagger.ApiOkResponse({ type: [Address] })
  @swagger.ApiForbiddenResponse()
  @ApiNestedQuery(AddressFindManyArgs)
  async findMany(@common.Req() request: Request): Promise<Address[]> {
    const args = plainToClass(AddressFindManyArgs, request.query);
    return this.service.findMany({
      ...args,
      select: {
        address_1: true,
        address_2: true,
        city: true,
        createdAt: true,
        id: true,
        state: true,
        updatedAt: true,
        zip: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @nestAccessControl.UseRoles({
    resource: "Address",
    action: "read",
    possession: "own",
  })
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: Address })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: AddressWhereUniqueInput
  ): Promise<Address | null> {
    const result = await this.service.findOne({
      where: params,
      select: {
        address_1: true,
        address_2: true,
        city: true,
        createdAt: true,
        id: true,
        state: true,
        updatedAt: true,
        zip: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @nestAccessControl.UseRoles({
    resource: "Address",
    action: "update",
    possession: "any",
  })
  @common.Patch("/:id")
  @swagger.ApiOkResponse({ type: Address })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: AddressWhereUniqueInput,
    @common.Body() data: AddressUpdateInput
  ): Promise<Address | null> {
    try {
      return await this.service.update({
        where: params,
        data: data,
        select: {
          address_1: true,
          address_2: true,
          city: true,
          createdAt: true,
          id: true,
          state: true,
          updatedAt: true,
          zip: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @nestAccessControl.UseRoles({
    resource: "Address",
    action: "delete",
    possession: "any",
  })
  @common.Delete("/:id")
  @swagger.ApiOkResponse({ type: Address })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: AddressWhereUniqueInput
  ): Promise<Address | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          address_1: true,
          address_2: true,
          city: true,
          createdAt: true,
          id: true,
          state: true,
          updatedAt: true,
          zip: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @nestAccessControl.UseRoles({
    resource: "Customer",
    action: "read",
    possession: "any",
  })
  @common.Get("/:id/customers")
  @ApiNestedQuery(CustomerFindManyArgs)
  async findManyCustomers(
    @common.Req() request: Request,
    @common.Param() params: AddressWhereUniqueInput
  ): Promise<Customer[]> {
    const query = plainToClass(CustomerFindManyArgs, request.query);
    const results = await this.service.findCustomers(params.id, {
      ...query,
      select: {
        address: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        email: true,
        firstName: true,
        id: true,
        lastName: true,
        phone: true,
        updatedAt: true,
      },
    });
    if (results === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return results;
  }

  @nestAccessControl.UseRoles({
    resource: "Address",
    action: "update",
    possession: "any",
  })
  @common.Post("/:id/customers")
  async connectCustomers(
    @common.Param() params: AddressWhereUniqueInput,
    @common.Body() body: CustomerWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      customers: {
        connect: body,
      },
    };
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @nestAccessControl.UseRoles({
    resource: "Address",
    action: "update",
    possession: "any",
  })
  @common.Patch("/:id/customers")
  async updateCustomers(
    @common.Param() params: AddressWhereUniqueInput,
    @common.Body() body: CustomerWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      customers: {
        set: body,
      },
    };
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @nestAccessControl.UseRoles({
    resource: "Address",
    action: "update",
    possession: "any",
  })
  @common.Delete("/:id/customers")
  async disconnectCustomers(
    @common.Param() params: AddressWhereUniqueInput,
    @common.Body() body: CustomerWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      customers: {
        disconnect: body,
      },
    };
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }
}
