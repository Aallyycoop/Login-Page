import { useTranslation } from 'react-i18next';
import routes from '../routes';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center mt-5">
      <h1 className="h4 text-muted">{t('pageNotFound')}</h1>
      <p className="text-muted">
        {t('returnToLoginPage')}
        {' '}
        <a href={routes.loginPagePath()}>{t('loginPage')}</a>
      </p>
    </div>
  );
};

export default NotFoundPage;
