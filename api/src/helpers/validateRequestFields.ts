import * as yup from 'yup';
import { requestBodyError } from './errors';
import '@core/requestFields/TranslationsYup';

export class ValidateRequestFields {

    static async validateFields(objShape: yup.ObjectShape, body: object): Promise<void> {
        try {

            const schema = yup.object().shape(objShape);
            await schema.validate(body, { abortEarly: false });
        }catch(err: any) {
            const yupError = err as yup.ValidationError;

            const errors: Record<string, string> = {}

            yupError.inner.forEach(error => {
                
                if (error.path === undefined) return;

                errors[error.path] = error.message
            })

            throw new requestBodyError('Campos passados incorretamente', errors);
        }

    }

}