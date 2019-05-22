from rest_framework import status
from rest_framework.response import Response


class Destroy:
    def __init__(self, model, id_list):
        self.model = model
        self.ids = id_list

    def destroy_multiple(self):
        for value in self.ids:
            instance = self.model.objects.filter(pk=value)
            if instance:
                instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
