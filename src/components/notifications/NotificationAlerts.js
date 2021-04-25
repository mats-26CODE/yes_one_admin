import toast from 'react-hot-toast';

//-> toast notification
export const notifySuccess = () => toast('Yay, Updated Successfully!',
    {
        icon: '👏',
        style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
        },
    }
);
export const notifyError = () => toast('Oh no!, Update Failed!',
    {
        icon: '😔',
        style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
        },
    }
);