
# origine python.doct pour la mesure du temps de requête
import datetime

class ClassSimpleMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.
        self.count_requests = 0
        self.count_exceptions = 0

    def __call__(self, request, *args, **kwargs):
        self.count_requests += 1
        print(f"Handled {self.count_requests} requests so far")
        return self.get_response(request)


    # One-time configuration and initialization.
    # exécutée quand Django reçoit une requête et doit décider la vue à utiliser
    def process_request(self, request):
        pass

    # exécutée lorsque Django apelle la vue. On peut donc récupérer les arguments de la vue
    # view_func est la fonction Python que Django est sur le point d'utiliser.
    def process_view(self, request, view_func, view_args, view_kwargs):
        request.time = datetime.datetime.now()

    # executée lorsque la vue a levé une exception
    def process_exeption(self, request, exception):
        pass

    # La vue a été executée mais pas encore de compilation de template
    # ( il est encore possible de chager le template )
    def process_template_response(self, request, response):
        return response

    # Tout est executée, dernier recours avant le retour client
    def process_response(self, request, response):
        if hasattr(request, 'time'):
            execution_time = datetime.datetime.now() - request.time
        else:
            execution_time = "Unknown"
        print("Execution time: %s secondes " % execution_time)
        return response