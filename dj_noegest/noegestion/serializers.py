from rest_framework.serializers import ModelSerializer
from noegestion.models import Articles


class ArticleSerializer(ModelSerializer):

    class Meta:
        model = Articles
        fields = ('id', 'username', 'first_name', 'last_name', 'bio', 'profile_pic')
        read_only_fields = ('username', )