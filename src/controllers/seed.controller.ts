import { uuid } from "uuidv4";
import { myDataSource } from "../database/data-source";
import { Request, Response } from "express";
import { mapResCode } from "../serverConfig/mapResCode";
import { baseResponse } from "../helpers/baseResponse/baseResponse";
import { POCRedis } from "../database/entity/POCRedis";
import redis from "redis";
const client = redis.createClient();

export const seed = async (req: Request, res: Response) => {
  const { size } = req.query;
  const fixedSize = Number(size) > 2000 ? 2000 : Number(size);
  const userArray = [...Array(Number(fixedSize))].map((item, index) => {
    return {
      name: uuid(),
    };
  });
  const user = myDataSource.getRepository(POCRedis);
  const responseData = await user.save(userArray);
  client.del("POCRedis");
  res.json(
    baseResponse(
      mapResCode.success.code,
      responseData,
      "Mock-up For Example Cache Redis"
    )
  );
};
