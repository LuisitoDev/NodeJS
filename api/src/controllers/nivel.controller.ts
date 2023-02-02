import * as message from "../libs/statusResponse";
import { Request, Response, NextFunction } from "express";
import { ExceptionHandler, handleException } from "../libs/ExceptionHandler";
import * as nivelQry from "../sql/nivel.queries";


export const getNiveles = async (req: Request, res: Response) => {
  
  try {
    const nivelesFound = await nivelQry.findAll();

    res.status(200).json(nivelesFound);
  } catch (exception) {
    return handleException(req, res, exception);
  }
};

export const getNivelById = async (req: Request, res: Response) => {
  const id = req.id;
  try {
    const nivelFound = await nivelQry.findById(id);

    res.status(200).json(nivelFound);
  } catch (exception) {
    return handleException(req, res, exception);
  }
};

export const createNivel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { nombre } = req.body;

  try {
    const nivelCreated = await nivelQry.createNivel(
      nombre,
      req
    );

    res.json({ status: message.statusResponse.SUCCESS });

    next();
  } catch (exception) {
    return handleException(req, res, exception);
  }
};


export const updateNivel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  const { id, nombre } = req.body;

  try {

    const nivelFound = await nivelQry.findById(id)

    if (nivelFound !== null){
      const nivelUpdated = await nivelQry.updateNivel(
        nivelFound.id,
        nombre,
        req
      );
    }

    res.json({ status: message.statusResponse.SUCCESS });

    next();
  } catch (exception) {
    return handleException(req, res, exception);
  }
};

export const deleteNivel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  const { id, nombre } = req.body;

  try {

    const nivelFound = await nivelQry.findById(id)

    if (nivelFound !== null){
      const nivelUpdated = await nivelQry.deleteNivel(
        nivelFound.id,
        req
      );
    }

    res.json({ status: message.statusResponse.SUCCESS });

    next();
  } catch (exception) {
    return handleException(req, res, exception);
  }
};
