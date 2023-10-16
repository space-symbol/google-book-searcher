import { useNavigate } from 'react-router-dom';
import { Page } from 'shared/ui/Page/Page.tsx';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import cls from './ErrorPage.module.css';

interface ErrorPageProps {
    className?: string;
}

export const ErrorPage = ({ className }: ErrorPageProps) => {
  const navigate = useNavigate();
    const reloadPage = () => {
        location.reload();
    };
  const backToLastPage = () => {
    navigate(-1);
  };

    return (
        <Page className={classNames(cls.ErrorPage, [className])}>
            <p>Произошла непредвиденная ошибка</p>
            <Button
              theme={ButtonTheme.OUTLINE}
              onClick={reloadPage}
            >
                Обновить страницу
            </Button>
            <Button
              theme={ButtonTheme.OUTLINE}
              onClick={backToLastPage}
            >
              Назад
            </Button>
        </Page>
    );
};
