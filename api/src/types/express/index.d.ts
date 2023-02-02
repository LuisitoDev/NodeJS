import express from "express";
import { QueryRunner } from "typeorm";
import { Meeting } from "../../models/Meeting";
import { Token } from "../../models/Token";
import { Request_Picture } from "../../models/Request_Picture";

declare global {
  namespace Express {
    interface Request {
        queryRunner?: Record<string,any>,
        id?: Record<number>
    }
  }
}