import * as message from "../libs/statusResponse";
import { Request, Response, NextFunction } from "express";
import { generateEncryptedToken } from "../libs/tokenManager";
import { ExceptionHandler, handleException } from "../libs/ExceptionHandler";
import * as userQry from "../sql/user.queries";


export const getAllUsers = async (req: Request, res: Response) => {
  
  try {
    const userFound = await userQry.findAll();

    res.status(200).json(userFound);
  } catch (exception) {
    return handleException(req, res, exception);
  }
};


export const getUserById = async (req: Request, res: Response) => {
  const id = req.id;
  try {
    const userFound = await userQry.findById(id);

    res.status(200).json(userFound);
  } catch (exception) {
    return handleException(req, res, exception);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { nombre, appellido_paterno, appellido_materno, nickname, password, id_nivel } = req.body;

  try {
    const userCreated = await userQry.createUser(
      nombre,
      appellido_paterno,
      appellido_materno,
      nickname,
      password,
      id_nivel,
      req
    );

    res.json({ status: message.statusResponse.SUCCESS });

    next();
  } catch (exception) {
    return handleException(req, res, exception);
  }
};


export const signIn = async (req: Request, res: Response) => {
  try {
    const { nickname, password } = req.body;

    const userSelect = await userQry.signIn(nickname, password);

    if (userSelect === null)
      return res.status(400).json({
        status: message.statusResponse.ERROR,
        token: null,
        message: "Invalid email or password",
      });

    const userDataToken = {
      email: nickname,
      password: password,
    };

    const token = generateEncryptedToken(userDataToken);

    res.json({
      status: message.statusResponse.SUCCESS,
      token: token,
    });
  } catch (exception) {
    return handleException(req, res, exception);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  const { id, nombre, appellido_paterno, appellido_materno, id_nivel } = req.body;

  try {
    const userFound = await userQry.findById(id)

    console.log(userFound)

    if (userFound !== null){
      const userUpdated = await userQry.updateUser(
        userFound.id,
        nombre,
        appellido_paterno,
        appellido_materno,
        id_nivel,
        req
      );
    }

    res.json({ status: message.statusResponse.SUCCESS });

    next();
  } catch (exception) {
    return handleException(req, res, exception);
  }
};



export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  const { id } = req.body;

  try {
    const userFound = await userQry.findById(id)

    console.log(userFound)

    if (userFound !== null){
      const userUpdated = await userQry.deleteUser(
        userFound.id,
        req
      );
    }

    res.json({ status: message.statusResponse.SUCCESS });

    next();
  } catch (exception) {
    return handleException(req, res, exception);
  }
};


