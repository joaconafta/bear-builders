import { FormType } from '../types/PurchaseFormType'
import axios from 'axios'

class EmailService {
  async sendForm(form: FormType): Promise<void> {
    const response = await axios.post('https://admin.itrock.com.ar/api/virtuality_contact', form)
    console.log(response.data)
  }
}

const emailService = new EmailService()

export default emailService
