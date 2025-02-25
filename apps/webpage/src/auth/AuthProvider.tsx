import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@repo/store";
import { checkAuthState } from "@repo/store";

interface Props {
    children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(checkAuthState());
    }, [dispatch]);

    return <>{children}</>;
};

export default AuthProvider; // ✅ Ensure it's exported as default
