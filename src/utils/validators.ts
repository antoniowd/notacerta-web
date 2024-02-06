export const validateName = () => {
  return {
    pattern:
      /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ\-]+(?: [A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ\-]+)+$/,
    message:
      "Nome completo inválido. Por favor, insira seu nome e sobrenome, utilizando apenas caracteres alfabéticos e acentuados.",
  };
};
