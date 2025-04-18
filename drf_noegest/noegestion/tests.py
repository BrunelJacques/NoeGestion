from django.urls.base import reverse_lazy, reverse
from rest_framework.test import APITestCase

from noegestion.models import StRayon, StArticle


class NoegestionAPITestCase(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.category = StRayon.objects.create(nom='Fruits')
        StRayon.objects.create(name='Légumes', active=False)

        cls.product = cls.category.products.create(name='Ananas', active=True)
        cls.category.products.create(name='Banane', active=False)

        cls.category_2 = StRayon.objects.create(name='Légumes', active=True)
        cls.product_2 = cls.category_2.products.create(name='Tomate', active=True)

    def format_datetime(self, value):
        return value.strftime("%Y-%m-%dT%H:%M:%S.%fZ")


class TestStRayon(NoegestionAPITestCase):

    url = reverse_lazy('strayon')

    def test_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        expected = [
            {
                'id': category.id,
                'name': category.name,
                'date_created': self.format_datetime(category.date_created),
                'date_updated': self.format_datetime(category.date_updated),
            } for category in [self.category, self.category_2]
        ]
        self.assertEqual(response.json(), expected)

    def test_create(self):
        category_count = StRayon.objects.count()
        response = self.client.post(self.url, data={'name': 'Nouvelle catégorie'})
        self.assertEqual(response.status_code, 405)
        self.assertEqual(StRayon.objects.count(), category_count)


class TestStArticle(NoegestionAPITestCase):

    url = reverse_lazy('product-list')

    def get_product_detail_data(self, products):
        return [
            {
                'id': product.pk,
                'name': product.name,
                'date_created': self.format_datetime(product.date_created),
                'date_updated': self.format_datetime(product.date_updated),
                'category': product.category_id
            } for product in products
        ]

    def test_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.get_product_detail_data([self.product, self.product_2]), response.json())

    def test_list_filter(self):
        response = self.client.get(self.url + '?category_id=%i' % self.category.pk)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.get_product_detail_data([self.product]), response.json())

    def test_create(self):
        product_count = StArticle.objects.count()
        response = self.client.post(self.url, data={'name': 'Nouvelle catégorie'})
        self.assertEqual(response.status_code, 405)
        self.assertEqual(StArticle.objects.count(), product_count)

    def test_delete(self):
        response = self.client.delete(reverse('product-detail', kwargs={'pk': self.product.pk}))
        self.assertEqual(response.status_code, 405)
        self.product.refresh_from_db()
