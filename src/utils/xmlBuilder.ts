export const xmlBuilder = (props: string[], table: string) => {
  let result = "";
  let parsedProps = "";
  props.forEach((prop) => (parsedProps += `' ${prop}=\"',${prop},'\"' ,`));
  result += `SET SESSION group_concat_max_len = 1000000;
  select group_concat(concat('<${table}',${parsedProps}'></${table}>') separator '') as xml from ${table}`;
  return result;
};
