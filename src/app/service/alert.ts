import Swal from "sweetalert2";

const loading = () => {
    Swal.fire({
        title: "กำลังโหลด...",
        didOpen: () => {
            Swal.showLoading();
            const modal: any = Swal.getPopup();
            const title: any = Swal.getTitle();

            if (modal && title) {
                modal.style.display = "flex";
                modal.style.flexDirection = "row";
                modal.style.justifyContent = "start";
                modal.style.alignItems = "center";

                modal.style.width = "22rem";
                modal.style.height = "4.5rem";

                title.style.fontSize = "16px";
                title.style.justifyContent = "start";
            }
        },
        allowOutsideClick: false, // ไม่ให้คลิกภายนอก SweetAlert2
        showCancelButton: false, // ไม่แสดงปุ่ม Cancel
        position: "top-end"
    });
};

const question = (msg: string) => {
    return Swal.fire({
        title: "Are you sure?",
        text: msg ? msg : "",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Confirm",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
    });
};

const successNoRespond = async (msg: string) => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top",
        iconColor: "white",
        customClass: {
            popup: "colored-toast",
        },
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
    });
    await Toast.fire({
        icon: "success",
        title: msg ? msg : "",
    })
};

const errorNoRespond = async (msg: any) => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top",
        iconColor: "white",
        customClass: {
            popup: "colored-toast",
        },
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
    });
    await Toast.fire({
        icon: "error",
        title: msg ? msg : "",
    });
};

const warningNoRespond = async (msg: any) => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top",
        iconColor: "white",
        customClass: {
            popup: "colored-toast",
        },
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
    });
    await Toast.fire({
        icon: "warning",
        title: msg ? msg : "",
    });
};

export {
    loading,
    question,
    successNoRespond,
    errorNoRespond,
    warningNoRespond,
};