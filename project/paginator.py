from rest_framework.pagination import PageNumberPagination
from collections import OrderedDict
from rest_framework.response import Response
from django.conf import settings


class CustomPaginator(PageNumberPagination):
    page_size = settings.REST_FRAMEWORK['POST_RESULTS']
    page_query_param = 'p'

    def get_paginated_response(self, data):
        return Response(OrderedDict([
            ('pages_count', self.page.paginator.num_pages),
            ('current_page', self.page.number),
            ('next', self.get_next_link()),
            ('previous', self.get_previous_link()),
            ('results', data)
        ]))


class TagsPaginator(CustomPaginator):
    page_size = settings.REST_FRAMEWORK['TAGS_RESULTS']
