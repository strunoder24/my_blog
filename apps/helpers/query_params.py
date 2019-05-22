class QueryParamsHelper:
    def __init__(self, query):
        self.params = query.dict()

    def has_params(self):
        return True if len(self.params) else False

    def get_params_keys(self):
        return list(self.params)

    def get_values_as_numbers(self, param_name):
        # Разделяет значения из строки с числами в список и возвращает список состоящий из чисел
        raw_list = self.params[param_name].split(', ')
        ready_list = []
        for value in raw_list:
            try:
                ready_list.append(int(value))
            except ValueError:
                print(f'Параметр {param_name} задан неверно')

        return ready_list
