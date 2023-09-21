import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface ErrorDetails {
    title: string;
    description: string;
}

class NotificationService {
    
    public successPlainText(msg: string) {
        toast.success(msg);
    }

    public errorPlainText(msg: string) {
        toast.error(msg);
    }

    public errorAxiosApiCall(error: AxiosError<ErrorDetails>) {
        const msg = error.response?.data.description.substring(19);
        toast.error(msg);
    }
}

const notifyService = new NotificationService();
export default notifyService;