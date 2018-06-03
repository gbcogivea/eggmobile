import _ from 'lodash';
import validator from 'validator';

const isEmpty = (value) => {
  switch (typeof value) {
    case 'string' :
      if (value === '') {
        return true;
      }
      break;
    case 'number' :
      if (value.toString() === '') {
        return true;
      }
      break;
    case 'undefined' :
      return true;
      break;
    default :
      return false;
  }
};

const isString = (value) => {
  return typeof value === 'string';
};

const isNumber = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

const isEmail = (value) => {
  if (typeof value !== 'string') {
    return false;
  } else {
    return validator.isEmail(value);
  }
};

const isDate = (value) => {
  if (validator.toDate(value)) {
    return true;
  } else {
    return false;
  }
};

const validate = (value, name, kind, required) => {
  let message = '';
  if (required && isEmpty(value)) {
    return '\n' + name + ' est obligatoire';
  } else {
    switch (kind) {
      case 'number':
        if (!isNumber(value))
          message = '\n' + name + ' est incorrect';
        break;
      case  'string':
        if (!isString(value))
          message = '\n' + name + ' est incorrect';
        break;
      case  'date':
        if (!isDate(value))
          message = '\n' + name + ' est incorrect';
        break;
      case  'email':
        if (!isEmail(value))
          message = '\n' + name + ' est incorrect';
        break;
      default :
        message = '';
    }
  }
  return message;
};

export const contact = (contact) => {
  const defaultMessage = 'Erreur lors de la saisie du contact : ';
  let message = defaultMessage;

  try {
    message += validate(contact.cct_nom, 'le nom', 'string', true);
    message += validate(contact.civilite_id, 'la civilité', 'string', true);
    message += validate(contact.cct_tel, 'le téléphone', 'number', true);
    message += validate(contact.cct_tel2, 'le second téléphone', 'number', true);
    message += validate(contact.cct_port, 'le portable', 'number', true);
    message += validate(contact.cct_fax, 'le fax', 'number', true);
    message += validate(contact.cct_mail, 'le mail', 'email', true);
    message += validate(contact.cct_comm, 'le commentaire', 'string', true);
    message += validate(contact.cct_source_id, 'la source', 'string', true);

    if (message !== defaultMessage) {
      throw new Error(message)
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export const compte = (compte) => {
  const defaultMessage = 'Erreur lors de la saisie du compte : ';
  let message = defaultMessage;

  try {
    message += validate(compte.clt_nmr, 'le numéro', 'number', true);
    message += validate(compte.clt_nom, 'le nom', 'string', true);
    message += validate(compte.etatclt_id, 'l\'état', 'number', true);
    message += validate(compte.statutclt_id, 'le status', 'number', true);
    message += validate(compte.civilite_id, 'la civilité', 'number', true);
    message += validate(compte.clt_comm, 'le commentaire', 'string', true);
    message += validate(compte.clt_tel, 'le téléphone', 'number', true);
    message += validate(compte.clt_tel2, 'le second téléphone', 'number', true);
    message += validate(compte.clt_port, 'le portable', 'number', true);
    message += validate(compte.clt_fax, 'le fax', 'number', true);
    message += validate(compte.clt_mail, 'le mail', 'email', true);
    message += validate(compte.clt_site, 'le site', 'string', true);
    message += validate(compte.clt_siret, 'le siret', 'number', true);
    message += validate(compte.clt_capital, 'le capital', 'number', true);
    message += validate(compte.clt_adr1, 'l\'adresse', 'string', true);
    message += validate(compte.clt_cp, 'le code postal', 'number', true);
    message += validate(compte.clt_ville, 'la ville', 'string', true);
    message += validate(compte.pays_id, 'le pays', 'number', true);
    message += validate(compte.clt_agt_ori, 'l\'agent', 'number', true);
    if (message !== defaultMessage) {
      throw new Error(message)
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export const affaire = (affaire) => {
  const defaultMessage = 'Erreur lors de la saisie de l\'affaire : ';
  let message = defaultMessage;

  try {
    message += validate(affaire.clt_nom, 'le nom', 'string', true);
    message += validate(affaire.clt_agt_ori, 'l\'agent', 'number', true);
    if (message !== defaultMessage) {
      throw new Error(message)
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export const tache = (tache) => {
  const defaultMessage = 'Erreur lors de la saisie de la tâche : ';
  let message = defaultMessage;

  try {
    message += validate(tache.even_id, 'l\'événement', 'number', true);
    message += validate(tache.agt_id, 'l\'agent', 'number', true);
    message += validate(tache.priorite, 'la priorité', 'number', true);
    message += validate(tache.clt_id, 'le client', 'number', true);
    message += validate(tache.cct_id, 'le contact', 'number', true);
    message += validate(tache.debut, 'la date de début', 'date', true);
    message += validate(tache.debut_h, 'l\'heure du début', 'string', true);
    message += validate(tache.comm, 'le commentaire', 'string', true);
    message += validate(tache.comm_htm, 'le commentaire', 'string', true);

    if (message !== defaultMessage) {
      throw new Error(message)
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export const evenement = (evenement) => {
  const defaultMessage = 'Erreur lors de la saisie de l\'événement : ';
  let message = defaultMessage;

  try {
    message += validate(evenement.even_nom, 'l\'événement', 'number', true);
    message += validate(evenement.agt_id, 'l\'agent', 'number', true);
    message += validate(evenement.type_nom, 'le type', 'number', true);
    message += validate(evenement.clt_id, 'le client', 'string', true);
    message += validate(evenement.cct_id, 'le contact', 'string', true);
    message += validate(evenement.debut, 'la date de début', 'number', true);
    message += validate(evenement.fin, 'la date de fin', 'number', true);
    message += validate(evenement.comm, 'le commentaire', 'string', true);
    message += validate(evenement.comm_htm, 'le commentaire', 'string', true);
    if (message !== defaultMessage) {
      throw new Error(message)
    }
  } catch (err) {
    throw new Error(err.message);
  }
};


