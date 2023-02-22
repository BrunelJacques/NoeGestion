from rest_framework import serializers
from .models import User
from dj_rest_auth.serializers import PasswordResetSerializer


class CustomPasswordResetSerializer(PasswordResetSerializer):

    def get_email_options(self):
        print("check override")

        return {
            'domain_override': 'localhost:8000',
            'email_template_name': 'account/email/password_reset_key_message.txt',
        }

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'bio', 'profile_pic')
        read_only_fields = ('username', )

# ajouté pour cryptage mot de passe mais non appelé en substitution à CreateAPIView
class RegisterSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password1', 'is_teacher',)

    def validate(self, attr):
        validate_password(attr['password'])
        return attr

    def create(self, validated_data):
        user = User.objects.create(  # this line  will solve your problem
            username=validated_data['username'],
            is_teacher=validated_data['user_type'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()

        return user