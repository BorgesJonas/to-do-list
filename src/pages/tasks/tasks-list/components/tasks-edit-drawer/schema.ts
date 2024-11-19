import { FORM_MESSAGES } from "@/pages/tasks/common/consts";
import * as yup from "yup";

export const schema = yup.object().shape({
  title: yup.string().required(FORM_MESSAGES.TITLE_REQUIRED),
  dueDate: yup.string().required(FORM_MESSAGES.DUE_DATA_REQUIRED),
  priority: yup
    .array()
    .of(yup.string())
    .required(FORM_MESSAGES.PRIORITY_REQUIRED),
  status: yup.array().of(yup.string()).required(FORM_MESSAGES.STATUS_REQUIRED),
  description: yup.string().required(FORM_MESSAGES.DESCRIPTION_REQUIRED),
});
